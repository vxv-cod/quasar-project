import axios from 'axios';
import utils from 'src/utils';


export default {
    name: 'projects',
    actions: {
        async loadProjects({commit}) {

            // await axios.get('/public/data/projects.json')
            //     .then((response) => {
            //         const objs = utils.apiObjectsToObjects(response.data);
            //         console.log("loadProjects", objs)
            //         commit("setProjects", objs);
            //     })
            //     .catch(err => console.log('Ошибка : ', err))

            await axios.get('/public/data/projects.json')
            // await axios.get('/public/data/vxv_Table.json')
            .then(res => {
              commit("setProjects", res.data)
            })
            .catch(err => console.log('Ошибка : ', err))

        },

    },
    mutations: {
        setProjects(state, projects) {
            const tempList = []
            projects.forEach((e, i) => {
              const temp = {}
              temp['ID'] = e.ID
              temp['SHIFR'] = ''
              temp['NAME'] = ''
              e.Contracts?.forEach(x => {
                temp['SHIFR'] = x.SHIFR
                temp['NAME'] = x.NAME
              })
              tempList.push(temp)
            })
            state.projects = structuredClone(tempList)
            state.copiedProjects = structuredClone(tempList)
        },
    },
    state: {
        projects: [],
        copiedProjects: [],
    },
    getters:{
        getProjects: (state) => {
            return state.projects.map(e => e);
        }
    }
}
