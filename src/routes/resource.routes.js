import { Router } from 'express';
import { check } from 'express-validator';

const router = new Router();

import * as resourceCtrl from '../controllers/resource.controller.js';
import { authJwt } from '../middlewares';

router.post(
  '/',
  [
    authJwt.verifyToken,
    authJwt.isVerifiedUser
  ],
  resourceCtrl.createResource
)

router.get(
  '/mines',
  [
    authJwt.verifyToken,
    authJwt.isVerifiedUser
  ],
  resourceCtrl.getResourcesByUser
);

router.get(
  '/:resourceId',
  [
    check('resourceId', 'Is is not a valid MongoDb Id.').isMongoId(),
    authJwt.verifyToken,
    authJwt.isVerifiedUser
  ],
  resourceCtrl.getResourceById
);
  
router.put(
  '/:resourceId',
  [
    check('resourceId', 'Is is not a valid MongoDb Id.').isMongoId(),
    authJwt.verifyToken,
    authJwt.isVerifiedUser
  ],
  resourceCtrl.updateResourceById
),
  
router.delete(
  '/:resourceId',
  [
    check('resourceId', 'Is is not a valid MongoDb Id.').isMongoId(),
    authJwt.verifyToken,
    authJwt.isVerifiedUser
  ],
  resourceCtrl.deleteResourceById
)

export default router;