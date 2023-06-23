import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resouceUserId) => {
    // don't have to call next as we throw error express setup handles
    //if (requestUser.role === 'admin') return
    // if (requestUser.userId === resouceUserId.toString()) return
    // throw new UnAuthenticatedError('Authentication invalid, no permission')
}

export default checkPermissions
