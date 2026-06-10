import style from "./Footer.module.css";

export const FooterComponent = () => {
  return (
    <>
      <section className={style.footer}>
        <div className={style.footer_inner}>

          <div>
            <h3>40+ Langauges</h3>
            <p>Offering Multilingual Choices</p>
          </div>

          <div>
            <h3>480+ Castes</h3>
            <p>Offering Multilingual Choices</p>
          </div>

          <div>
            <h3>3200+ Cities</h3>
            <p>Across 4 countries of operation</p>
          </div>

          <div>
            <h3>4+ Countries</h3>
            <p>Offering Multilingual Choices</p>
          </div>
        </div>
      </section>
    </>
  )
}
