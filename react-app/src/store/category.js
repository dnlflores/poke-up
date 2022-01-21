const LOAD_CATEGORIES = 'categories/LOAD_CATEGORIES';

const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    payload: categories
});

export const getCategories = () => async dispatch => {
    const response = await fetch("/api/categories/");

    if(response.ok) {
        const categories = await response.json();
        dispatch(loadCategories(categories));
        return categories;
    }
};

export default function categoryReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_CATEGORIES:
            const loadState = {...state};
            action.payload.categories?.forEach(category => loadState[category.id] = category);
            return loadState;
        default:
            return state;
    }
}