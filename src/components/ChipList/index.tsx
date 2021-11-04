import { Box, Chip, Typography } from '@mui/material';
import { noop } from '../../types/constant';

const year = ['全部', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];
const area = [
  '全部',
  '大陆',
  '香港',
  '台湾',
  '美国',
  '法国',
  '英国',
  '日本',
  '韩国',
  '德国',
  '泰国',
  '印度',
  '意大利',
  '西班牙',
  '加拿大',
  '其他',
];
interface IChipListProp {
  data?: string[];
  title?: string;
  onChange?: (txt: string) => void;
  now?: string;
}

const ChipList = (props: IChipListProp) => {
  const { data = year, title = '年代', onChange = noop, now = '' } = props;
  const handleClick = (item: string) => {
    if (item === '全部') {
      onChange('');
    } else {
      onChange(item);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'auto',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography sx={{ flexShrink: 0 }} component="span">
        {title}：
      </Typography>
      {data.map((i) => (
        <Chip
          key={i}
          style={{ marginRight: 8, backgroundColor: 'transparent' }}
          onClick={() => handleClick(i)}
          size="small"
          label={i}
          variant={now === i ? 'outlined' : undefined}
        />
      ))}
    </Box>
  );
};

export interface IChipGroupProps {
  onChange: (txt: string) => void;
  nowShow: string;
}

export const YearChipList: React.FC<IChipGroupProps> = ({ onChange, nowShow }) => {
  return <ChipList title="年代" now={nowShow} data={year} onChange={onChange} />;
};

export const AreaChipList: React.FC<IChipGroupProps> = ({ onChange, nowShow }) => {
  return <ChipList title="地区" now={nowShow} data={area} onChange={onChange} />;
};

export default ChipList;
