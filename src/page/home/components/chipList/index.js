import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';

const year = ['全部', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];
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
const noop = () => {};

const useStyles = makeStyles(theme => ({
  chipListWrapper: {
    display: 'flex',
    overflow: 'auto',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  chipListTitle: {
    flexShrink: 0,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  chipItem: {
    marginRight: theme.spacing(),
    backgroundColor: 'transparent',
  },
}));

const ChipList = props => {
  const { data = year, title = '年代', onChange = noop, now } = props;
  // const [now,setNow] = useState();
  const styles = useStyles();

  const handleClick = item => {
    if (item === '全部') {
      onChange('');
    } else {
      onChange(item);
    }
    // setNow(item);
  };

  return (
    <div className={styles.chipListWrapper}>
      <span className={styles.chipListTitle}>{title}：</span>
      {data.map(i => (
        <Chip
          className={styles.chipItem}
          onClick={() => handleClick(i)}
          size="small"
          label={i}
          variant={now === i ? 'outlined' : 'default'}
        />
      ))}
    </div>
  );
};

export const YearChipList = ({ onChange, nowShow }) => {
  return <ChipList title="年代" now={nowShow} data={year} onChange={onChange} />;
};

export const AreaChipList = ({ onChange, nowShow }) => {
  return <ChipList title="地区" now={nowShow} data={area} onChange={onChange} />;
};

export default ChipList;
