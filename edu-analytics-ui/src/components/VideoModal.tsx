import { Modal,Box } from '@material-ui/core'
import YoutubePlayer from './YoutubePlayer';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface VideoModal {
    videoId: string,
    open: boolean,
    onClose: EventListener,

}


const VideoModal: React.FunctionComponent<VideoModal> = ({ videoId, open, onClose }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            
            <Box sx={style}>
            <YoutubePlayer videoId={videoId} />
            </Box>
        </Modal>
    )

}

export default VideoModal;
