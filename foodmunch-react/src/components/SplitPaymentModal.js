import React from 'react';

const SplitPaymentModal = ({ group }) => {
  const calculateSplits = () => {
    if (group.splitMethod === 'equal') {
      const total = group.items.reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
      return group.members.map(member => ({
        member,
        amount: (total / group.members.length).toFixed(2)
      }));
    } else {
      return group.members.map(member => {
        const memberItems = group.items.filter(item => item.user._id === member._id);
        const amount = memberItems.reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
        return { member, amount: amount.toFixed(2) };
      });
    }
  };

  const splits = calculateSplits();

  return (
    <div className="modal fade" id="splitModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Split Payment</h5>
          </div>
          <div className="modal-body">
            {splits.map((split, index) => (
              <div key={index} className="mb-2">
                <strong>{split.member.name}:</strong> ₹{split.amount}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary">Confirm Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitPaymentModal;