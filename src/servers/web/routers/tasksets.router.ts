import { Router } from 'express';
import * as TaskSetsController from '../controllers/tasksets.controller';
const router = Router();

router.get('/', TaskSetsController.getTaskSets);
router.get('/supported-runnables', TaskSetsController.supportedRunnables);

router.post('/', TaskSetsController.createTaskSet);
router.put('/:id', TaskSetsController.editTaskset);

router.get('/:id/export', TaskSetsController.exportTaskSet);
router.post('/:id/cancel', TaskSetsController.cancelTaskSet);
router.post('/:id/restart', TaskSetsController.restartTaskSet);
router.get('/:id', TaskSetsController.getTaskSet);
router.delete('/:id', TaskSetsController.removeTaskSet);

export = router;
