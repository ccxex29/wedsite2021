import styles from '../styles/OurStory.module.sass';

const ourStoryText = "Grace and Fecund first met in university through a campus event in Binus University. Grace was a freshman, and Fecund was a sophomore at that time. After Grace's first year, she accidentally met Fecund again, and after seven months of going out together, they finally in a relationship. They used to wait for each other to meet after class to have lunch together, try new cafes or eat their favourite foods. Also, sometimes they did school's projects together. They have different hobbies like Grace adores classical music, so she takes Fecund to classical concerts and introduces many songs. She also loves travelling so she asked him to go with her, tried going to new destinations and now, he can't wait to go to more places with her. Fecund likes films, so he often takes Grace to the cinema. He is more capable of design; it makes him help and teaches her a lot of it. Fun fact, he is neater, cleaner and calmer than Grace, but Grace is well-managed and able to think faster. So, they ideally fit and help each other. After almost ten years of cherishing every moment together, they decided to take a new step in their lives to start a new family."
const OurStory = () => {
    return (
        <main className={styles.cover}>
            <div className={styles.theStoryWrapper}>
                {ourStoryText}
            </div>
        </main>
    );
}

export default OurStory;
