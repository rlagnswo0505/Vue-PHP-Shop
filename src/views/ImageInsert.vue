<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품 사진 등록</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품ID</label>
        <div class="col-md-9">
          {{ productDetail.id }}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          {{ productDetail.product_name }}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">썸네일이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-2" :key="idx" v-for="(item, idx) in productImage.filter((c) => c.type == 1)">
              <div class="position-relative">
                <img :src="`/static/img/${item.product_id}/${item.type}/${item.path}`" class="img-fluid" />
                <div class="position-absolute top-0 end-0" style="cursor: pointer" @click="deleteImage(item)">X</div>
              </div>
            </div>
          </div>
          <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>이미지 사이즈 : 350*350</li>
              <li>파일 사이즈 : 1M 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-2" :key="idx" v-for="(item, idx) in productImage.filter((c) => c.type == 2)">
              <div class="position-relative">
                <img :src="`/static/img/${item.product_id}/${item.type}/${item.path}`" class="img-fluid" />
                <div class="position-absolute top-0 end-0" style="cursor: pointer" @click="deleteImage(item)">X</div>
              </div>
            </div>
          </div>
          <input type="file" multiple class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 2)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>최대 5개 가능</li>
              <li>이미지 사이즈 : 700*700</li>
              <li>파일 사이즈 : 1M 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품설명이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-lg-6 col-md-8">
              <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 3)" />
              <div class="alert alert-secondary" role="alert">
                <ul>
                  <li>파일 사이즈 : 5M 이하</li>
                  <li>파일 확장자 : png, jpg만 가능</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6 col-md-4" :key="idx" v-for="(item, idx) in productImage.filter((c) => c.type == 3)">
              <div class="position-relative">
                <img :src="`/static/img/${item.product_id}/${item.type}/${item.path}`" class="img-fluid" />
                <div class="position-absolute top-0 end-0" style="cursor: pointer" @click="deleteImage(item)">X</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 row m-auto">
        <button type="button" class="btn btn-lg btn-dark" @click="goToList">확인</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      productId: 0,
      productName: '',
      productDetail: {},
      productImage: [],
      image_id: '',
    };
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.productDetail = this.$store.state.sallerSelectedProduct;
    this.getProductImage();
  },
  updated() {
    this.getProductImage();
  },
  methods: {
    goToList() {
      this.$router.push({ path: '/sales' });
    },
    async getProductImage() {
      this.productImage = await this.$get(`/api/productImageList/${this.productDetail.id}`);
    },
    async uploadFile(files, type) {
      console.log(files);

      const images = [];
      if (files.length <= 5) {
        for (let i = 0; i < files.length; i++) {
          images.push(await this.$base64(files[i]));
        }
      } else {
        this.$swal.fire('5개를 초과하였습니다[최대 5개].', '', 'warning');
      }
      console.log(images);

      const formData = { images };
      const { error } = await this.$post(`/api/upload/${this.productDetail.id}/${type}`, formData);
      console.log(error);
    },
    async deleteImage({ id, product_id, type, path }) {
      const result = await this.$delete(`/api/productImageDelete/${id}/${product_id}/${type}/${path}`);
      console.log(result);
    },
  },
};
</script>

<style scoped></style>
