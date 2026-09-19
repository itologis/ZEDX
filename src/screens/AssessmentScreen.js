import { useMemo, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {
    saveAssessmentResult
} from '../data/progress';
import { QUIZZES } from '../data/quiz';

const shuffleQuestions = (questions) => {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }

    return shuffled;
};

export default function AssessmentScreen({
    languageKey,
    languageData,
    accentColor = '#89b4fa',
    onComplete,
    onBack
}) {
    const questions = useMemo(() => {
        const allQuestions = [];

        for (const level of languageData.levels) {
            const quiz =
                QUIZZES[languageKey]?.[level.level];

            if (!quiz?.questions) {
                continue;
            }

            for (const question of quiz.questions) {
                allQuestions.push({
                    ...question,
                    _level: level.level
                });
            }
        }

        return shuffleQuestions(allQuestions);
    }, [languageKey, languageData]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [selectedOption, setSelectedOption] =
        useState(null);

    const [answers, setAnswers] =
        useState([]);

    const [result, setResult] =
        useState(null);

    if (questions.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorTitle}>
                        Assessment unavailable
                    </Text>

                    <Text style={styles.errorText}>
                        There are currently no assessment
                        questions for this language.
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor:
                                    accentColor
                            }
                        ]}
                        onPress={() => onComplete?.()}
                    >
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const question =
        questions[currentQuestion];

    const handleOptionSelect = (index) => {
        // The user can change their answer
        // until they press Next.
        setSelectedOption(index);
    };

    const calculateResults = (
        finalAnswers
    ) => {
        const levelResults = {};

        for (const level of languageData.levels) {
            const levelQuestions =
                questions.filter(
                    item =>
                        item._level ===
                        level.level
                );

            const levelAnswers =
                finalAnswers.filter(
                    answer =>
                        answer.level ===
                        level.level
                );

            const score =
                levelAnswers.filter(
                    answer =>
                        answer.selected ===
                        answer.correct
                ).length;

            const total =
                levelQuestions.length;

            const quizData =
                QUIZZES[languageKey]?.[
                level.level
                ];

            const passingScore =
                quizData?.passingScore ||
                Math.ceil(total * 0.6);

            levelResults[level.level] = {
                score,
                total,
                passingScore,
                passed:
                    score >= passingScore
            };
        }

        let startingLevel =
            languageData.levels[0]?.level;

        for (
            const level of languageData.levels
        ) {
            const levelResult =
                levelResults[level.level];

            if (!levelResult?.passed) {
                startingLevel =
                    level.level;

                break;
            }

            startingLevel =
                level.level;
        }

        return {
            scores: levelResults,
            startingLevel
        };
    };

    const handleNext = async () => {
        if (selectedOption === null) {
            return;
        }

        const answer = {
            level: question._level,
            selected: selectedOption,
            correct: question.correct
        };

        const finalAnswers = [
            ...answers,
            answer
        ];

        setAnswers(finalAnswers);

        if (
            currentQuestion <
            questions.length - 1
        ) {
            setCurrentQuestion(
                currentQuestion + 1
            );

            setSelectedOption(null);

            return;
        }

        const assessmentResult =
            calculateResults(
                finalAnswers
            );

        await saveAssessmentResult(
            languageKey,
            assessmentResult
        );

        setResult(assessmentResult);
    };

    if (result) {
        const recommendedLevel =
            languageData.levels.find(
                level =>
                    level.level ===
                    result.startingLevel
            );

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={
                        styles.resultContainer
                    }
                >
                    <View style={styles.resultCard}>
                        <Text style={styles.resultTitle}>
                            Assessment Complete
                        </Text>

                        <Text style={styles.resultSubtitle}>
                            Recommended starting point
                        </Text>

                        <Text
                            style={[
                                styles.recommendedLevel,
                                {
                                    color: accentColor
                                }
                            ]}
                        >
                            {recommendedLevel?.label ||
                                result.startingLevel}
                        </Text>

                        <Text style={styles.resultDescription}>
                            Based on your answers, this is the
                            level we recommend starting with.
                        </Text>

                        <View
                            style={styles.scoreContainer}
                        >
                            {languageData.levels.map(
                                level => {
                                    const levelResult =
                                        result.scores[
                                        level.level
                                        ];

                                    return (
                                        <View
                                            key={
                                                level.level
                                            }
                                            style={styles.scoreRow}
                                        >
                                            <Text
                                                style={
                                                    styles.scoreLevel
                                                }
                                            >
                                                {level.label}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.scoreValue
                                                }
                                            >
                                                {levelResult.score}
                                                {' / '}
                                                {levelResult.total}
                                            </Text>
                                        </View>
                                    );
                                }
                            )}
                        </View>

                        <Text style={styles.freeExploreText}>
                            You can still open any level and
                            learn in whatever order you prefer.
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor:
                                        accentColor
                                }
                            ]}
                            onPress={() =>
                                onComplete?.(result)
                            }
                        >
                            <Text style={styles.buttonText}>
                                Start Learning
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={onBack}
                    style={styles.quitButton}
                >
                    <Text
                        style={[
                            styles.quitText,
                            {
                                color: accentColor
                            }
                        ]}
                    >
                        ← Quit
                    </Text>
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>
                        Initial Assessment
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        Find your starting point
                    </Text>
                </View>

                <View style={styles.headerSpacer} />
            </View>

            <View
                style={styles.progressContainer}
            >
                <Text style={styles.progressText}>
                    Question {currentQuestion + 1}
                    {' of '}
                    {questions.length}
                </Text>

                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${((currentQuestion + 1) /
                                        questions.length) *
                                    100
                                    }%`,
                                backgroundColor:
                                    accentColor
                            }
                        ]}
                    />
                </View>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View
                    style={[
                        styles.questionCard,
                        {
                            borderTopColor:
                                accentColor
                        }
                    ]}
                >
                    <Text style={styles.assessmentLabel}>
                        Assessment
                    </Text>

                    <Text style={styles.questionText}>
                        {question.question}
                    </Text>

                    <Text style={styles.changeHint}>
                        Select an answer. You can change it
                        before continuing.
                    </Text>

                    <View
                        style={styles.optionsContainer}
                    >
                        {question.options.map(
                            (option, index) => {
                                const isSelected =
                                    selectedOption ===
                                    index;

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.optionButton,
                                            isSelected && {
                                                borderColor:
                                                    accentColor,
                                                backgroundColor:
                                                    '#202238'
                                            }
                                        ]}
                                        onPress={() =>
                                            handleOptionSelect(
                                                index
                                            )
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected && {
                                                    color:
                                                        accentColor,
                                                    fontWeight:
                                                        '600'
                                                }
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }
                        )}
                    </View>

                    {selectedOption !== null && (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor:
                                        accentColor
                                }
                            ]}
                            onPress={handleNext}
                        >
                            <Text
                                style={
                                    styles.buttonText
                                }
                            >
                                {currentQuestion ===
                                    questions.length - 1
                                    ? 'See Results'
                                    : 'Next Question'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1b26'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#2c2e3e'
    },

    quitButton: {
        padding: 8,
        minWidth: 70
    },

    quitText: {
        fontSize: 15,
        fontWeight: '500'
    },

    headerCenter: {
        flex: 1,
        alignItems: 'center'
    },

    headerSpacer: {
        width: 70
    },

    headerTitle: {
        color: '#c0caf5',
        fontSize: 21,
        fontWeight: 'bold'
    },

    headerSubtitle: {
        color: '#9399b2',
        fontSize: 13,
        marginTop: 4
    },

    progressContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        padding: 14,
        backgroundColor: '#24273a',
        borderRadius: 12
    },

    progressText: {
        color: '#c0caf5',
        fontSize: 14,
        marginBottom: 8
    },

    progressBar: {
        height: 6,
        backgroundColor: '#2c2e3e',
        borderRadius: 3,
        overflow: 'hidden'
    },

    progressFill: {
        height: '100%',
        borderRadius: 3
    },

    content: {
        flex: 1
    },

    questionCard: {
        backgroundColor: '#24273a',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        borderTopWidth: 4
    },

    assessmentLabel: {
        color: '#9399b2',
        fontSize: 13,
        marginBottom: 8
    },

    questionText: {
        color: '#c0caf5',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },

    changeHint: {
        color: '#9399b2',
        fontSize: 12,
        marginBottom: 18,
        lineHeight: 18
    },

    optionsContainer: {
        marginBottom: 16
    },

    optionButton: {
        backgroundColor: '#1a1b26',
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent'
    },

    optionText: {
        color: '#cdd6f4',
        fontSize: 16
    },

    button: {
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8
    },

    buttonText: {
        color: '#1a1b26',
        fontSize: 16,
        fontWeight: 'bold'
    },

    resultContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },

    resultCard: {
        backgroundColor: '#24273a',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center'
    },

    resultTitle: {
        color: '#c0caf5',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12
    },

    resultSubtitle: {
        color: '#9399b2',
        fontSize: 15,
        textAlign: 'center'
    },

    recommendedLevel: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 10
    },

    resultDescription: {
        color: '#cdd6f4',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20
    },

    scoreContainer: {
        width: '100%',
        backgroundColor: '#1a1b26',
        borderRadius: 10,
        padding: 14,
        marginBottom: 18
    },

    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 7
    },

    scoreLevel: {
        color: '#c0caf5',
        fontSize: 14
    },

    scoreValue: {
        color: '#a6e3a1',
        fontSize: 14,
        fontWeight: 'bold'
    },

    freeExploreText: {
        color: '#9399b2',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 19,
        marginBottom: 12
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    errorTitle: {
        color: '#c0caf5',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },

    errorText: {
        color: '#9399b2',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20
    }
});