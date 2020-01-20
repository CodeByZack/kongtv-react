const createReducer = models => {
  const finalReducer = {};
  const defaultState = {};
  const nameSpaces = Object.keys(models);
  for (let index = 0; index < nameSpaces.length; index++) {
    const nameSpace = nameSpaces[index];
    const model = models[nameSpace];
    //处理state
    defaultState[nameSpace] = model.state;
    //处理reducer
    const modelReducerKeys = Object.keys(model.reducers);
    for (let index = 0; index < modelReducerKeys.length; index++) {
      const reudcerKey = modelReducerKeys[index];
      finalReducer[`${nameSpace}/${reudcerKey}`] = model.reducers[reudcerKey];
    }
  }
  return (state = defaultState, action) => {
    const reducer = finalReducer[action.type];
    const newState = { ...state };
    if (reducer) {
      const { type, payload } = action;
      const [modelName] = type.split('/');
      newState[modelName] = reducer(state[modelName], ...payload);
      return newState;
    } else {
      // console.log('未找到注册的Reducers');
      return newState;
    }
  };
};

const ejectDispatch = (store, models) => {
  const { dispatch, getState } = store;
  const nameSpaces = Object.keys(models);
  for (let index = 0; index < nameSpaces.length; index++) {
    const nameSpace = nameSpaces[index];
    const model = models[nameSpace];
    //把所有方法注入dispatch
    //为所有effect绑定this
    model.effects = model.effects ? model.effects : {};
    dispatch[nameSpace] = {};
    const modelEffectKeys = Object.keys(model.effects);
    for (let index = 0; index < modelEffectKeys.length; index++) {
      const effectKey = modelEffectKeys[index];
      dispatch[nameSpace][effectKey] = args => {
        model.effects[effectKey].call(dispatch[nameSpace], args, getState());
      };
    }
    //替换所有reducer方法
    const modelReducerKeys = Object.keys(model.reducers);
    for (let index = 0; index < modelReducerKeys.length; index++) {
      const reudcerKey = modelReducerKeys[index];
      const type = `${nameSpace}/${reudcerKey}`;
      dispatch[nameSpace][reudcerKey] = (...payload) =>
        dispatch({ type, payload });
    }
  }
  return dispatch;
};

let _models = null;

const reduxtool = {
  createReducer: models => {
    _models = models;
    return createReducer(_models);
  },
  ejectDispatch: dispatch => {
    if (!_models) {
      // console.log('请先调用ReduxTool.createReducer()注入models');
      return;
    }
    if (!dispatch) {
      // console.log('请传入redux/store的dispatch方法');
      return;
    }
    ejectDispatch(dispatch, _models);
  },
};

export default reduxtool;
