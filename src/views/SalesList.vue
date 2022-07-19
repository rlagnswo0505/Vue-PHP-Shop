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
          <tr :key="product.id" v-for="product in productList">
            <td>
              <!-- <img :src="`/download/${product.id}/${product.path}`" style="height: 50px; width: auto" /> -->
            </td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ product.delivery_price }}</td>
            <td>{{ product.add_delivery_price }}</td>
            <td>
              <button type="button" class="btn btn-info me-1" @click="goToImageInsert(product.id)">사진등록</button>
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
      const result = await this.$post('/api/delProduct', {
        id,
      });
      console.log(result);
    },
    goToProductCreate() {
      this.$router.push({ path: '/create' });
    },
    goToImageInsert(product_id) {
      this.$router.push({ path: '/image_insert', query: { product_id: product_id } });
    },
  },
};
</script>
