import Image from "next/image";
import { useEffect } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("brandLogoAppear");
        } else {
          entry.target.classList.remove("brandLogoAppear");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".brandLogo");
    hiddenElements.forEach((el) => observer.observe(el));

    return hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="relative w-full h-[100vh] snap-center  bg-fixed  bg-cover bg-no-repeat bg-center">
      <video
        src="/herovid.mp4"
        loop
        autoPlay
        muted
        className="absolute top-0 z-0 w-full h-full object-cover bg-fixed"
      ></video>
      <div className="relative flex flex-col gap-2 justify-center items-center overflow-hidden h-full w-full">
        <div className="w-1/2 md:w-1/3 overflow-hidden brandLogo">
          <Image
            alt="hero"
            src={"/Logotextwhite.svg"}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-xl md:text-[40px] text-white font-bold brandLogo py-5">
          Every Run is a Win{" "}
        </p>
        <Button onCLickHandler={() => router.push('/shop')} extras="brandLogo my-5">Shop</Button>
      </div>
    </div>
  );
};

export default Hero;
