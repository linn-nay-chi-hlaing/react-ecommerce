import UserLayout from "./UserLayout";
import "../../css/user/home.css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { adminProduct, type AdminProductProps } from "../admin/AdminData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [products] = useState<AdminProductProps[]>(adminProduct);

  const slides = [
    "public/images/men-perfume.jpg",
    "public/images/woman-perfume.jpg",
    "public/images/unisex.jpg",
  ];

  return (
    <UserLayout>
      <div className="home-section">
        {/* Banner Carousel */}
        <section>
          <div className="home-banner">
            <div className="carousel">
              <div className="carousel-track">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    nextEl: ".image-button-next",
                    prevEl: ".image-button-prev",
                  }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={true}
                >
                  {slides.map((src, i) => (
                    <SwiperSlide key={i}>
                      <img src={src} alt={`Slide ${i}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Navigation buttons */}
              <div className="image-button-prev">
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
              <div className="image-button-next">
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>

            <h1>Welcome To Amara</h1>
            <p>
              Discover amazing products at unbeatable prices. Shop with
              confidence and enjoy fast, secure delivery.
            </p>

            <div className="shop-btn">
              <button>
                <a href="/products">
                  <FontAwesomeIcon icon={faBagShopping} />
                  <span>Shop Now</span>
                </a>
              </button>
            </div>
          </div>
        </section>

        {/* New Products */}
        <div className="new-product">
          {products.map((product) => (
            <div key={product.id} className="new-product-box">
              <div className="new-tag">
                <p>New</p>
              </div>
              <div>
                <a href="">
                  <img src={product.image} alt={product.name} />
                </a>
                <div>
                  <h3>{product.name}</h3>
                  <p>Eau de parfum</p>
                  <p>${product.sell_price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="service">
          <div className="service-part">
            <img src="/public/images/5 1.png" alt="Engraving" />
            <div>
              <h3>Complimentary Engraving</h3>
              <p>
                Maison Francis Kurkdjian is pleased to offer you complimentary
                engraving on any My Very Intimate Perfumes fragrance until
                Wednesday, June 11th.
              </p>
            </div>
          </div>

          <div className="service-part">
            <img src="/public/images/6 1.png" alt="Exclusive" />
            <div>
              <h3>Exclusive Benefits</h3>
              <p>
                We are pleased to offer you a range of exclusive online services
                and a gift of your choice from the special online selection.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="selection">
          <div className="selection-para">
            <div className="para-one">
              <h3>Our Selection</h3>
            </div>
            <div>
              <p>
                Express your personality by choosing one or more emblematic
                pieces
                <br /> from the Maison's fragrance wardrobe.
              </p>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              990: { slidesPerView: 3 },
              840: { slidesPerView: 3 },
              675: { slidesPerView: 2 },
              300: { slidesPerView: 1 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="featured-products-box">
                <a href={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p>${product.sell_price}</p>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation buttons */}
            <div className="swiper-button-prev">
              <FontAwesomeIcon icon={faChevronLeft} className="swiper-button" />
            </div>
            <div className="swiper-button-next">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="swiper-button"
              />
            </div>
          </Swiper>
        </div>
      </div>
    </UserLayout>
  );
}
