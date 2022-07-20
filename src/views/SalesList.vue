<template>
  <main class="mt-3">
    <div class="container">
      <div class="float-end mb-1">
        <button type="button" class="btn btn-dark" @click="goToProductCreate">제품등록</button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>제품명</th>
            <th>제품가격</th>
            <th>배송비</th>
            <th>추가 배송비</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="product.id" v-for="(product, idx) in productList">
            <td>
              <!-- <img :src="`/download/${product.id}/${product.path}`" style="height: 50px; width: auto" /> -->
            </td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ product.delivery_price }}</td>
            <td>{{ product.add_delivery_price }}</td>
            <td>
              <button type="button" class="btn btn-info me-1" @click="goToImageInsert(idx)">사진등록</button>
              <button type="button" class="btn btn-warning me-1">수정</button>
              <button type="button" class="btn btn-danger" @click="delProduct(product.id)">삭제</button>
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
  methods: {
    async getProductList2() {
      const productList2 = await this.$get('/api/productList2', {});
      console.log(productList2);
      this.productList = productList2;
    },
    async delProduct(id) {
      this.$swal
        .fire({
          title: '정말 삭제하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const result = await this.$post('/api/delProduct', {
              id,
            });
            console.log(result);
            this.$swal.fire('삭제되었습니다.', '', 'success');
            this.$router.push({ path: '/sales' });
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
