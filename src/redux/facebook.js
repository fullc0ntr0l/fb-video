import graph from 'fbgraph';

const SET_USER = 'planable/fb/SET_USER';
const SET_FEED = 'planable/fb/SET_FEED';

const initialState = {
  userData: null,
  groupId: null,
  fetchingFeed: true,
  feed: [],
}


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      {
        const { accessToken } = action.user;
        graph.setAccessToken(accessToken);
        graph.setVersion("2.9");
        return { ...state, userData: action.user };
      }
    case SET_FEED:
      {
        const groupId = action.groupId || null;
        const feed = action.feed;
        const fetchingFeed = false;
        return { ...state, feed, fetchingFeed, groupId };
      }
    default:
      return state;
  }
}


export const setUser = (user) => ({
  type: SET_USER,
  user
});


export const getFeed = userId => dispatch => new Promise((resolve, reject) => {
  const errorFetching = (err) => {
    dispatch({
      type: SET_FEED,
      feed: []
    });
    reject(err);
  }

  graph.get(`${userId}/groups?fields=administrator`, (err, res) => {
    if (err) {
      errorFetching(err);
    } else {
      const data = res.data.filter(g => g.administrator)[0];

      if (!data) {
        errorFetching("No groups");
      } else {
        const feedUrl = `${data.id}/feed?fields=id,type,object_id,from{id,picture,name},source,message,picture,updated_time,properties,link`;

        graph.get(feedUrl, function(err, res) {
          if (!err) {
            dispatch({
              type: SET_FEED,
              feed: res.data,
              groupId: data.id,
            });
            resolve(res);
          } else {
            errorFetching(err);
          }
        });
      }
    }
  })
});
