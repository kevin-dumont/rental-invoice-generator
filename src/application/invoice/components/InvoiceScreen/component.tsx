import { IInvoiceViewModel } from '../InvoiceScreen/types';
import { observer } from 'mobx-react-lite';
import { Input } from '@chakra-ui/react';

export interface InvoiceScreenProps {
  viewModel: IInvoiceViewModel;
}

const InvoiceScreen = ({ viewModel }: InvoiceScreenProps) => {
  return (
    <div>
      <div>
        <label htmlFor="price">Prix à la nuit</label>
        <Input
          id="price"
          value={viewModel.wantedTotalPrice}
          onChange={viewModel.refresh}
          placeholder="price"
        />
      </div>
      <div>
        <label htmlFor="price">Nb adultes</label>
        <Input
          id="price"
          value={viewModel.nbAdults}
          onChange={viewModel.refresh}
          placeholder="travelers"
        />
      </div>
      <div>
        <label htmlFor="nights">Nb nuits</label>
        <Input
          id="nights"
          type="date"
          value={viewModel.startDate}
          onChange={viewModel.refresh}
          placeholder="nights"
        />
      </div>
      <div>
        <label htmlFor="cleaning">Frais de ménage</label>
        <Input
          id="cleaning"
          value={viewModel.cleaningFees}
          onChange={viewModel.refresh}
          placeholder="Cleaning fees"
        />
      </div>
    </div>
  );
};

export const SmartInvoiceScreen = observer(InvoiceScreen);
