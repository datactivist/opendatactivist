// components/TaskCardGallery.js

import TaskCard from './TaskCard';
import styles from '../../styles/TaskCard.module.css';

function TaskCardGallery({ tasks }) {
    return (
        <div className={styles.gallery}>
            {tasks.map((task) => (
                <TaskCard key={task.id} title={task.title} description={task.description} score={task.score} />
            ))}
        </div>
    );
}

export default TaskCardGallery;
