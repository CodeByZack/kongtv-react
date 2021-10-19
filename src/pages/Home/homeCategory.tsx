import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { MovieType } from '../../types';

interface IProps {
  type: MovieType;
}

const HomeCategory = (props: IProps) => {
  const { type } = props;
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Paper>fdsfdfds{type}</Paper>
    </Box>
  );
};
export default HomeCategory;
