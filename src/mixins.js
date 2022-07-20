import axios from 'axios';

export default {
  methods: {
    async $post(url, data) {
      return (
        await axios({
          method: 'post',
          url,
          data,
        }).catch((e) => {
          console.error(e);
        })
      ).data;
    },
    // 꼭 params라는 객체를 만들어서 보내야함 axios 문법임
    async $get(url, param) {
      return (
        await axios
          .get(url, {
            params: param,
          })
          .catch((e) => {
            console.error(e);
          })
      ).data;
    },
    async $delete(url, param) {
      return (
        await axios
          .delete(url, {
            params: param,
          })
          .catch((e) => {
            console.error(e);
          })
      ).data;
    },
    $base64(file) {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = (e) => {
          resolve(e.target.result);
        };
        fr.readAsDataURL(file);
      });
    },
  },
};
