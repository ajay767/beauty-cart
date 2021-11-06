export const _cartmarkup = `
        <div class="flex items-start mb-2" >
            <img
              src=%CART_PHOTO%
              class="h-20 w-20 rounded-md object-cover"
            />
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-700">
               %CART_TITLE%
              </h2>
              <p class="text-lg font-bold text-gray-700">%CART_PRICE%</p>
              <p class="text-xs text-gray-500 flex items-center justify-between w-20 my-2">
                <button data-type="minus" data-id=%CART_ID%  class=" z-10 cursor-pointer text-sm h-6 w-6 flex items-center justify-center bg-gray-200 ring-1 ring-gray-50 rounded-full">
                    <img  class="pointer-events-none h-3 w-3" src="/images/minus.png" />
                </button>
                %CART_QUANTITY%
                <button data-type="plus" data-id=%CART_ID% class=" z-10 cursor-pointer text-sm h-6 w-6 flex items-center justify-center bg-gray-200 ring-1 ring-gray-50 rounded-full">
                    <img  class="pointer-events-none h-3 w-3" src="/images/plus.png"/>
                </button>
              </p>
            </div>
        </div>`;

export const _alertmarkup = `
    <div id="alert-box" class="animate__animated animate__slideInUp animate__faster rounded-md fixed bottom-5 right-5 border-l-8 border-%COLOR%-500 bg-gray-800 text-white p-10 py-5">
      <p class="text-sm">%MESSAGE%</p>
    </div>`;
