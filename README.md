# codigo.pizza

Sharing code like sharing pizza.

Create shareable code editors in the browser for real time collaboration. These are peer-to-peer connections, your data is never hosted or seen by my server. 

## How it works

- Click "Start new editor" to create a unique session URL
- Share the URL with collaborators to invite them to edit
- All changes sync in real-time using WebRTC peer-to-peer connection
- Built with Yjs CRDTs for conflict-free collaborative editing

## Contributing

How to get started:

```bash
# Clone the repository
git clone https://github.com/Linnk/codigo.pizza.git
cd codigo.pizza

# Install dependencies
npm install

# Start the development server
npm start

# On a separate terminal, start the signaling server
npm run signaling
```

## License & Acknowledgements

- **codigo.pizza** is released under the [BSD 3-Clause license](https://github.com/Linnk/codigo.pizza/blob/main/LICENSE)
- Inspired by the incredible (FilePizza)[https://github.com/kern/filepizza]
