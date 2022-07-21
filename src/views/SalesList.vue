<template>
  <main class="mt-3">
    <div class="container">
      <div class="float-end mb-1">
        <button type="button" class="btn btn-dark" @click="goToProductCreate">제품등록</button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>&ensp;</th>
            <th>제품명</th>
            <th>제품가격</th>
            <th>배송비</th>
            <th>추가 배송비</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="product.id" v-for="(product, idx) in productList">
            <td style="position: absolute height: 300px width: 200px">
              <div class="imgBox">
                <img style="position: relative top:0 bottom: 0 left:0 right:0" v-if="product.path !== null" :src="`/static/img/${product.id}/1/${product.path}`" />
              </div>
            </td>
            <td class="td">{{ product.product_name }}</td>
            <td class="td">{{ product.product_price }}</td>
            <td class="td">{{ product.delivery_price }}</td>
            <td class="td">{{ product.add_delivery_price }}</td>
            <td class="td">
              <button type="button" class="btn btn-info me-1" @click="goToImageInsert(idx)">사진등록</button>
              <button type="button" class="btn btn-warning me-1">수정</button>
              <button type="button" class="btn btn-danger" @click="deleteProduct(product.id, idx)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      productList: {},
    };
  },
  created() {
    this.getProductList2();
  },
  updated() {
    this.getProductList2();
  },
  methods: {
    async getProductList2() {
      const productList2 = await this.$get('/api/productList2', {});
      this.productList = productList2;
    },
    async deleteProduct(id, idx) {
      this.$swal
        .fire({
          title: '정말 삭제하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const result = await this.$delete(`/api/deleteProduct/${id}`);
            if (result.result === 1) {
              this.productList.splice(idx, 1);
            }
            this.$swal.fire('삭제되었습니다.', '', 'success');
          }
        });
    },
    goToProductCreate() {
      this.$router.push({ path: '/create' });
    },
    goToImageInsert(idx) {
      this.$store.commit('sallerSelectedProduct', this.productList[idx]);
      this.$router.push({ path: `/image_insert` });
    },
  },
  computed: {},
};
</script>

<style scoped>
.imgBox {
  padding: 25px 0;
}
td {
  text-align: center;
  vertical-align: middle;
}
img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  vertical-align: middle;
}
</style>
