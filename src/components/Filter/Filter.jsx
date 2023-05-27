import PropTypes from 'prop-types';
import { FilterWrapper } from './Filter.styled';
import { Button } from '../common.styled';

const Filter = ({ filter, onChange, onReset }) => {
  return (
    <FilterWrapper>
      <input type="text" name="filter" value={filter} onChange={onChange} />
      <Button type="button" onClick={onReset}>
        Clear field
      </Button>
    </FilterWrapper>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
