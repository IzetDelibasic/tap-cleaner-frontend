import { Link } from "react-router-dom";
import { CustomButton } from "../../components";
import { landingImage, heroImage } from "../../constants/imageConstant";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <TrashIcon className="h-8 w-8" />
          <span className="text-xl font-bold font-cabin">Tap Cleaner</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="font-cabin hover:text-emerald-600 duration-300 ease-in-out"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="#"
            className="font-cabin hover:text-emerald-600 duration-300 ease-in-out"
            prefetch={false}
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="">
        <section className="py-6 md:py-12 lg:py-18">
          <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-6 w-[90%]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl sm:text-5xl font-title">
                Tap Cleaner - Održavanje javne čistoće
              </h1>
              <p className="md:text-[1.2rem] lg:w-[80%] text-center font-montserrat py-4">
                Aplikacija Tap Cleaner pomaže u održavanju javne čistoće i
                stanja kontejnera u gradu. Prijavite probleme, pratite status i
                doprinosite boljoj kvaliteti života.
              </p>
            </div>
            <img
              src={heroImage}
              alt="Tap Cleaner"
              className="mx-auto overflow-hidden rounded-xl lg:w-[60%] h-"
            />
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="px-4 font-montserrat text-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Glavne karakteristike
                </h2>
                <p className="">
                  Tap Cleaner aplikacija nudi niz korisnih opcija za
                  prijavljivanje problema, praćenje statusa i unapređenje javne
                  čistoće.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Prijava problema</h3>
                      <p className="text-muted-foreground">
                        Jednostavno prijavite probleme s kontejnerima,
                        nečistoćom ili drugim pitanjima.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Praćenje statusa</h3>
                      <p className="text-muted-foreground">
                        Pratite status i stanje kontejnera u svome gradu, te
                        pomozite revoluciji čišćenja da doživi ekspanziju.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Unapređenje kvalitete
                      </h3>
                      <p className="text-muted-foreground">
                        Vaše prijave pomažu u unapređenju kvalitete života u
                        gradu, te očuvanju okoliša.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src={landingImage}
                alt="Tap Cleaner"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="register" className="bg-emerald-600 text-white py-16">
          <div className="container flex flex-col items-center mx-auto px-6 md:px-12 lg:px-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
              Spremni ste za transformaciju javne čistoće?
            </h2>
            <p className="text-lg md:text-xl mb-12 font-montserrat">
              Pridružite se gradovima koji već koriste inovativna rješenja
              TapCleanera.
            </p>
            <div>
              <Link to="/register">
                <CustomButton
                  className="relative bg-emerald-300 text-white font-medium py-[1rem] lg:px-[2.5rem] px-[2.5rem] md:px-[1.5rem] mr-0 mb-[20px] sm:mb-0 rounded-[3rem] group overflow-hidden z-[1] text-nowrap"
                  iconClassName="group-hover:text-white ml-[10px]"
                  title="Clean on Tap"
                  titleClassName="group-hover:text-white font-subtitle"
                >
                  <div className="absolute inset-0 bg-black w-full transform origin-bottom transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
                </CustomButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs">&copy; 2024 Tap Cleaner. All rights reserved.</p>
      </footer>
    </div>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
