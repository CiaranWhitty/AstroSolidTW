export default function GetProduct({ product }) {
  return (
    <>
      <div class="m-auto mt-4 mb-4 w-10/12">
        <a href="/products">
          <button class="btn btn-wide"> Go Back</button>
        </a>
      </div>
      <div class="mt-4 mb-4 flex flex-wrap justify-evenly">
        <div class="max-w-md">
          <img
            class="w-full"
            src={String(product?.image[0].src)}
            alt={product?.name}
            height={200}
          />
        </div>
        <div>
          <h1 class="mb-2 text-5xl font-bold">{product?.name}</h1>
          <div class="flex justify-evenly">
            <div class="mr-4 font-bold">Price</div>
            <span>{product?.price}</span>
          </div>
          <div class="card-actions justify-end">
            <a href={`/categories/${product.category}`} class="w-fit">
              <div class="badge badge-outline bg-gray-300 p-2 hover:underline">
                {product.category}
              </div>
              {/* To List Categories
                <div class="flex flex-row justify-center">
                  {
                    product?.categories.map((category) => {
                      return (
                        <a
                          href={`/categories/${category.url_name}`}
                          class="p-2 hover:underline"
                        >
                          <div class="badge badge-outline bg-gray-300 p-2">
                            {category.name}
                          </div>
                        </a>
                      );
                    })
                  }
                </div>
              */}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
