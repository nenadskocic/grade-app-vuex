import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store( {
    state: {
        title: "Grade App",
        courses: [
            {
                courseName: "Emerging Web Technologies",
                mark: "60",
            },
            {
                courseName: "Software Capstone",
                mark: "80",
            },
            {
                courseName: "Enterprise Java",
                mark: "90",
            },
            {
                courseName: "Machine Learning",
                mark: "70",
            },
            {
                courseName: "iPhone Programming",
                mark: "40",
            },
          ],
    },
    getters: {

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
    },
    actions: {
        removeCourse: (context, course) => {
            context.commit("REMOVE_COURSE", course)
        }
    }
})
