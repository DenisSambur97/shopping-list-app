import React, {useEffect, useState} from 'react';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faCircle, faCheckCircle, faPlus} from '@fortawesome/free-solid-svg-icons';

const App = () => {
    // HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
    const [items, setItems] = useState([
        {itemName: 'Хлеб', quantity: 1, isSelected: false},
        {itemName: 'Морковь/кг', quantity: 3, isSelected: true}
    ]);

    const [inputValue, setInputValue] = useState('')

    const [totalCountItem, setTotalCountItem] = useState(0);

    function addItem() {
        let newItem = {itemName: inputValue, quantity: 1, isSelected: false}
        setItems([newItem, ...items])
        setInputValue('')
    }

    function handleInc(i) {
        const newItems = [...items]

        newItems[i].quantity++

        setItems(newItems)
        calcTotal()
    }

    function handleDec(i) {
        const newItems = [...items]

        if (newItems[i].quantity <= 0) {
            newItems[i].quantity = 0
        }else{
            newItems[i].quantity--
        }

        setItems(newItems)
        calcTotal()
    }

    const toggleComplete = (i) => {
        const newItems = [...items]

        newItems[i].isSelected = !newItems[i].isSelected

        setItems(newItems)
    }

    const calcTotal = () => {
        const total = items.reduce((total, item) => {
            return total + item.quantity
        }, 0)

        setTotalCountItem(total)
    }

    useEffect(() => calcTotal(), [])

    return (
        <div className='app-background'>
            <div className='main-container'>
                <h1 className='heading'>Приложение для создания списка продуктов</h1>
                <div className='add-item-box'>
                    <input value={inputValue} className='add-item-input' placeholder='Добавьте продукт...'
                           onChange={(event) => setInputValue(event.target.value)}/>
                    <FontAwesomeIcon icon={faPlus} onClick={addItem}/>
                </div>
                <div className='item-list'>
                    {items.map(({itemName, isSelected, quantity}, i) => (
                        <div className='item-container' key={i}>
                            <div className='item-name' onClick={() => toggleComplete(i)}>
                                {isSelected ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                        <span className='completed'>{itemName}</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faCircle}/>
                                        <span>{itemName}</span>
                                    </>
                                )}
                            </div>
                            <div className='quantity'>
                                <button>
                                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleDec(i)}/>
                                </button>
                                <span>{quantity}</span>
                                <button>
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleInc(i)}/>
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='total'>Всего: {totalCountItem}</div>
            </div>
        </div>
    );
};


export default App;