export type ChangePasswordDialogProps = {
  open: boolean;
  loading: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onClose: () => void;
  onSubmit: () => void;
  onCurrentPassword: (value: string) => void;
  onNewPassword: (value: string) => void;
  onConfirmPassword: (value: string) => void;
};
