import React from 'react';

function AddChannel({ existingChannel, channels, addChannel, joinChannel }) {
  return (
    <section id="add-channel">
      <input
        placeholder="Join Channel"
        onKeyPress={e => {
          if (e.key === 'Enter') {
            if (!existingChannel(e.target.value, channels)) {
              addChannel(e.target.value);
              joinChannel(e.target.value);
            }
          }
        }}
        type="text"
      />
    </section>
  );
}

export default AddChannel;
