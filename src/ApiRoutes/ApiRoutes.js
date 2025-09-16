const ApiRoutes = {
    GET : {
        GET_USER : "/user",
        GET_JOURNALS : "/journal",
        GET_JOURNAL_BY_ID : "/journal/id"
    },
    POST : {
        LOGIN :"/public/login",
        REGISTER : "/public/signup",
        CREATE_NEW_JOURNAL : "/journal"
    },
    PUT : {
        UPDATE_JOURNAL : "/journal/id"
    },

    DELETE : {
        DELETE_JOURNAL : "/journal/id"
    }
};

export default ApiRoutes;