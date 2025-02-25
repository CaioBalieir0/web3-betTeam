"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doLogin } from "@/services/Web3Services";

export default function Home() {
  const { push } = useRouter();

  const [message, setMessage] = useState();

  const btnLoginClick = () => {
    doLogin()
      .then((account) => push("/bet"))
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      });
  };

  return (
    <>
      <Head>
        <title>BetCaditadte | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img
              src="https://lncimg.lance.com.br/cdn-cgi/image/width=828,quality=75,fit=pad,format=webp/uploads/2023/10/tr8-5.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt=""
              width="700"
              height="500"
            />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              BetTimes!
            </h1>
            <p className="lead">Apostas onChain na disputa de times!</p>
            <p className="lead">
              Entre com a sua carteira e deixa sua aposta para a próxima
              disputa.
            </p>
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4"
                onClick={btnLoginClick}
              >
                <img src="/metamask.svg" width={64} className="me-3" />
                Conectar com a metamask
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secondary">&copy; 2024 BetTimes</p>
          <ul className="nav col-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">
                About
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
