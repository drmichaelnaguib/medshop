import Image from "next/image";
import styles from "./ProductCard.module.scss";

export default function Card2({ mainImg, cardTitle, cardSubtitle }) {
  return (
    <div className={styles.card2}>
      <div className={styles["image-container"]}>
        <Image
          width={50}
          height={50}
          src={mainImg}
          alt={cardTitle}
          className={styles["main-img"]}
        />
      </div>

      <h3 className={styles["card-title"]}>{cardTitle}</h3>
      {/* <h4 className={styles["card-subtitle"]}>Category: {cardSubtitle}</h4> */}

      <div className={`${styles["card-actions"]} w-75`}>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
