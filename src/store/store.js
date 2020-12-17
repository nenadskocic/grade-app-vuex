import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store( {
    state: {
        title: "Grade App",
        headers: [
            { 
                text: "Course",
                align: "start",
                value: "courseName",
            },
            { 
                text: "Mark",
                value: "mark",
            },
        ],
        courses: [
            {
                courseName: "Emerging Web Technologies",
                mark: "60",
            },
            {
                courseName: "Software Capstone",
                mark: "35",
            },
            {
                courseName: "Enterprise Java",
                mark: "90",
            },
            {
                courseName: "Machine Learning",
                mark: "64",
            },
        ],
        edited: [ 
            {
            courseName: "",
            mark: "0",
            }
        ],

    },  
    mutations: {
        ADD_COURSE: (state, course) => {
            state.courses.push({
                courseName: course.courseName,
                mark: course.mark
            })    
        },
        REMOVE_COURSE: (state, course) => {
            state.courses.splice(course, 1)
        },   
        EDIT_COURSE: (state, course) => {
            state.courses.splice(course, 1, {courseName: course.courseName, mark: course.mark })
            //state.courses.mark = { courseName: course.courseName, mark: course.mark }
        },
    },
    actions: {
        removeCourse: (context, course) => {
            context.commit("REMOVE_COURSE", course)
        },
    },
})
