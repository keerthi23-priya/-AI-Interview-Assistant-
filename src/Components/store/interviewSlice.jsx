import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("interviewState")) || {
    candidate: null,
    answers: [],
    step: 0,
    inProgress: false,
    allCandidates: [],
};

const interviewSlice = createSlice({
    name: "interview",
    initialState: saved,
    reducers: {
        clearCandidates: (state) => {
            state.allCandidates = [];
            save(state);
        },

        setCandidate: (state, action) => {
            state.candidate = action.payload;
            state.inProgress = true;
            save(state);
        },

        saveAnswer: (state, action) => {
            state.answers.push(action.payload);
            state.step += 1;
            save(state);
        },

        finishInterview: (state, action) => {
            // action.payload = final AI score
            const score = action.payload;
            const summary = `Candidate ${state.candidate.name} scored ${score}`;
            state.allCandidates.push({
                ...state.candidate,
                score,
                summary,
                answers: state.answers,
            });

            // reset for next interview
            state.candidate = null;
            state.answers = [];
            state.step = 0;
            state.inProgress = false;

            save(state);
        },

        resumeInterview: (state) => {
            const saved = JSON.parse(localStorage.getItem("interviewState"));
            if (saved && saved.candidate) {
                state.candidate = saved.candidate;
                state.answers = saved.answers || [];
                state.step = saved.step || 0;
                state.inProgress = true;
            }
        },

        resetInterview: (state) => {
            state.candidate = null;
            state.answers = [];
            state.step = 0;
            state.inProgress = false;
            save(state);
        },
    },
});

const save = (state) => {
    localStorage.setItem("interviewState", JSON.stringify(state));
};

export const {
    setCandidate,
    saveAnswer,
    finishInterview,
    resumeInterview,
    resetInterview,
    clearCandidates,
} = interviewSlice.actions;

export default interviewSlice.reducer;
