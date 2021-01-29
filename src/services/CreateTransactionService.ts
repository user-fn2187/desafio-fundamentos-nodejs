import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO{
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value, type}: RequestDTO): Transaction {
    const {total}=this.transactionsRepository.getBalance();

    if(type ==="outcome" && total<value){
      throw Error("Found not avaible");
    }

    const transection = this.transactionsRepository.create({title,type,value})

    return transection;

  }
}

export default CreateTransactionService;
