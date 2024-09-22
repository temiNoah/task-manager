// localStorage.js

export const loadState = () => {
    try {
       // alert("hi")
        const serializedState = localStorage.getItem('state'); //alert(JSON.stringify(serializedState))
        const result = serializedState ? JSON.parse(serializedState).boards : [];

        return result
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
