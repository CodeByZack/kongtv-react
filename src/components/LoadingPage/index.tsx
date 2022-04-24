import { CircularProgress, Stack } from '@mui/material';

const LoadingPage = () => {
  return (
    <Stack
      sx={{ minHeight: '100vh' }}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Stack>
  );
};

export default LoadingPage;
