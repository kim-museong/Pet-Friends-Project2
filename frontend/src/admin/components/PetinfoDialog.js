import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button} from '@mui/material';

const PetinfoDialog = ({isOpen, user, pet, onClose}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            {user && pet && (
                <>
                    <DialogTitle>{user.nickname}의 펫 정보:</DialogTitle>
                    <DialogContent>
                        <Typography>펫 이름: {pet.name}</Typography>
                        <Typography>펫 종류: {pet.type}</Typography>
                        <Typography>펫 종: {pet.kind}</Typography>
                        <Typography>펫 나이: {pet.age}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} variant="error">
                            닫기
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default PetinfoDialog;
