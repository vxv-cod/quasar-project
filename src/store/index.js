import { createStore } from 'vuex'


async function loadStores() {
  const resourceModules = {};
  const modules = import.meta.globEager('./modules/**/*.js');
  console.log('modules = ', modules);

  for (const path in modules) {
    resourceModules[modules[path].default.name] = modules[path].default;
  }

  return resourceModules;
};

const resourceModules = await loadStores();

const store = createStore({
  modules: resourceModules
});

export default store;
