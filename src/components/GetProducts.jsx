export default function GetProducts({ products }) {
  return (
    <div class="w-12/12 m-auto flex flex-wrap justify-around lg:w-11/12">
      {products.map((product) => {
        return (
          <div class="card m-5 w-96 rounded bg-base-100 shadow-xl duration-500 motion-safe:hover:scale-105  sm:p-5">
            <a
              href={`/products/${product.urlName}`}
              class="flex justify-center"
            >
              <img
                class="sm:scale-125"
                src={product.image[0].src}
                alt={product?.name}
                height={200}
              />
            </a>
            <div class="card-body">
              <a
                href={`/products/${product.urlName}`}
                class="w-fit hover:underline"
              >
                <h2 class="card-title">{product.name}</h2>
              </a>
              <div class="card-actions justify-end">
                <a href={`/categories/${product.category}`} class="w-fit">
                  <div class="badge badge-outline bg-gray-300 p-2 hover:underline">
                    {product.category}
                  </div>
                </a>
              </div>
              {/* To List Categories
              {product.categories.map((category: any) => {
                return (
                  <a
                    href={`/categories/${category.url_name}`}
                    class="w-fit"
                  >
                    <div class="badge badge-outline bg-gray-300 p-2 hover:underline">
                      {category.name}
                    </div>
                  </a>
                );
              })} 
              */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
