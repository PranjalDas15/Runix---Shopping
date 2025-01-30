import { coupons } from "@/lib/assets";
import { setPaymentMethod, setTotalPrice } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

const PaymentInterface = () => {
  const dispatch = useAppDispatch();
  const { totalPrice, selectedProducts } = useAppSelector(
    (state) => state.cart
  );
  const [coupon, setCoupon] = useState<string>("");
  const [localTotal, setLocalTotal] = useState<number>(0);
  const [isApplied, setisApplied] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<number>();

  useEffect(() => {
    const initialTotal = selectedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    setLocalTotal(initialTotal);
    dispatch(setTotalPrice(initialTotal));
    setAppliedCoupon(couponValue)
  }, [selectedProducts, dispatch]);

  const couponValue = coupons.find((c) => c.code === coupon)?.amount;
  const applyCoupon = () => {
      if (couponValue) {
        const finalTotalPrice = localTotal - couponValue;
        dispatch(setTotalPrice(finalTotalPrice));
        setAppliedCoupon(couponValue);
        setisApplied(true);
      }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor="payment">Payment Method</label>
        <select
          defaultValue={"Select Payment Method"}
          onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
          name="payment"
          id="payment"
          className="py-2 border-orange-400 border"
        >
          <option value={"Select Payment Method"} disabled>
            Select Payment Method
          </option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      <div className="pt-10">
        <div>
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={coupon}
            placeholder="Enter Coupon code"
            className="py-3 px-2 border border-orange-400"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            disabled={!!isApplied}
            className="border border-orange-400 px-2 py-3"
            onClick={applyCoupon}
          >
            Appy Coupon
          </button>
        </div>
        {/* <div className="w-full h-80 ">
          {coupons.map((coupon, index) => {
            return (
              <div key={index} className="w-full border">
                <input
                  type="radio"
                  value={coupon.code}
                  name="coupon"
                  id={coupon.code}
                  className="peer hidden"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <label
                  htmlFor={coupon.code}
                  className="peer-checked:bg-orange-200 w-full h-full py-2 "
                >
                  {coupon.code}
                </label>
              </div>
            );
          })}
        </div> */}
        <div className="text-end">
          <h3 className={` font-semibold ${isApplied ? 'text-gray-400 text-base': 'text-black text-xl'}`}><span className={`${isApplied ? 'hidden': 'block'}`}>Total: </span> ₹ {localTotal}</h3>
          {isApplied ? (
            <div className="text-end">
              <p className="text-orange-400 text-sm">-₹{appliedCoupon}</p>
              <p className="text-sm font-light text-gray-500">Coupon Applied</p>
              <h3 className="font-semibold text-xl"><span>Total: </span>₹ {totalPrice}</h3>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentInterface;
