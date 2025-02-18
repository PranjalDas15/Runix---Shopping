import { coupons, paymentType } from "@/lib/assets";
import { setPaymentMethod, setTotalPrice } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Tag } from "lucide-react";
import { useEffect, useState } from "react";

const PaymentInterface = () => {
  const dispatch = useAppDispatch();
  const { totalPrice, selectedProducts } = useAppSelector(
    (state) => state.cart
  );
  const [coupon, setCoupon] = useState<string>("");
  const [couponMenuOpen, setCouponMenuOpen] = useState<boolean>(false);
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
    setAppliedCoupon(couponValue);
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
      <p>Select Payment Method</p>
      <div className="flex gap-2">
        {paymentType.map((payment, index) => {
          return (
            <div key={index} className="w-36 h-14 text-wrap font-semibold">
              <input
                type="radio"
                name="paymentMethod"
                id={payment.type}
                value={payment.type}
                onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
                className="peer hidden"
              />
              <label
                htmlFor={payment.type}
                className="w-full h-full peer-checked:bg-orange-100 flex items-center justify-center bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                {payment.type}
              </label>
            </div>
          );
        })}
        {/* <select
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
        </select> */}
      </div>
      <div className="pt-10">
        <div className="flex justify-between items-center">
          <button
            disabled={!!coupon}
            onClick={() => setCouponMenuOpen(!couponMenuOpen)}
            className="flex gap-2 items-center border border-orange-400 px-3 py-2"
          >
            <Tag size={20} />
            <p>Apply Coupon</p>
          </button>
          <p>
            Coupon Applied: <span className="text-orange-400">{coupon}</span>
          </p>
        </div>
        <div
          className={`w-full mt-2  custom-transition overflow-hidden ${
            couponMenuOpen ? "h-auto" : "h-0"
          }`}
        >
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={coupon}
            placeholder="Enter Coupon code"
            className="py-3 px-2 border border-orange-400 peer"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            disabled={!!isApplied}
            className="border border-orange-400 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer px-2 py-3"
            onClick={() => {
              applyCoupon();
              setCouponMenuOpen(!couponMenuOpen);
            }}
          >
            Apply
          </button>
          <div className="flex flex-col gap-2 py-2">
            {coupons.map((c, index) => (
              <div key={index} className="">
                <input
                  type="radio"
                  name="coupon"
                  id={c.code}
                  checked={coupon === c.code}
                  value={c.code}
                  className="hidden peer"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <label
                  htmlFor={c.code}
                  className="hover:bg-red-300 border rounded-xl peer-checked:border-orange-400 w-full h-full flex justify-between py-3 px-4"
                >
                  <p>{c.code}</p>
                  <p>₹{c.amount} OFF</p>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="">
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={coupon}
            placeholder="Enter Coupon code"
            className="py-3 px-2 border border-orange-400 peer"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            disabled={!!isApplied}
            className="border border-orange-400 px-2 py-3"
            onClick={applyCoupon}
          >
            Appy Coupon
          </button>
          <div className="w-full h-0 mt-2 peer-focus-visible:h-auto custom-transition overflow-hidden">
            {coupons.map((coupon, index)=>(
              <div key={index} className="px-2 py-2">
                <input type="radio" name="coupon" id={coupon.code} value={coupon.code} className="hidden peer" onChange={(e)=>setCoupon(e.target.value)}/>
                <label htmlFor={coupon.code} className="hover:bg-red-300 border rounded-xl peer-checked:border-orange-400 w-full h-full flex justify-between py-3 px-4">
                  <p>{coupon.code}</p>
                  <p>₹{coupon.amount} OFF</p>
                </label>
              </div>
            ))}
          </div>
        </div> */}
        <div className="text-end">
          <h3
            className={` font-semibold ${
              isApplied ? "text-gray-400 text-base" : "text-black text-xl"
            }`}
          >
            <span className={`${isApplied ? "hidden" : "block"}`}>Total: </span>{" "}
            ₹ {localTotal}
          </h3>
          {isApplied ? (
            <div className="text-end">
              <p className="text-orange-400 text-sm">-₹{appliedCoupon}</p>
              <p className="text-sm font-light text-gray-500">Coupon Applied</p>
              <h3 className="font-semibold text-xl">
                <span>Total: </span>₹ {totalPrice}
              </h3>
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
