import img1 from "@/assets/mainpage.jpg";
import Logo from "@/assets/logo.jpg";

const AuthLayout = ({ children, title, subtitle, variant = "default" }) => {
  const isSplitLayout = variant === "split";

  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      {isSplitLayout ? (
        <div
          className="hidden flex-1 items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12 lg:flex lg:w-1/2"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white/85 p-6 shadow-xl shadow-blue-500/20 backdrop-blur-sm">
            <img
              src={Logo}
              alt="Pranidaya logo"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      ) : null}

      <div
        className={
          isSplitLayout
            ? "flex flex-1 items-center justify-center bg-blue-50 px-4 py-12 lg:w-1/2"
            : "flex min-h-screen items-center justify-center bg-blue-50 px-4 py-12"
        }
      >
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg shadow-blue-500/20">
          <div className="mb-6 flex justify-center lg:hidden">
            <img
              src={Logo}
              alt="Pranidaya logo"
              className="h-auto w-full rounded-lg"
            />
          </div>

          {title ? (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#002D74]">{title}</h2>
              {subtitle ? (
                <p className="mt-2 text-xs text-[#002D74]">{subtitle}</p>
              ) : null}
            </div>
          ) : null}

          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
