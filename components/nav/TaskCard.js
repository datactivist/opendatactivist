import styles from '../../styles/TaskCard.module.css'; 

function TaskCard({ title, description, score }) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.score}>Score: {score}</p>
      </div>
    );
  }
  
  export default TaskCard;