
class Node {
    constructor(parent, state, possibleMoves = [], col = null) {
        // Tree structure
        this.parent = parent
        this.children = new Array()
        this.col = col
        this.state = state

        this.possibleMoves = possibleMoves // Possible moves from this state

        // Monte Carlo
        this.visits = 0
        this.wins = 0 
    }

    isFullyExpanded() {
        return this.possibleMoves.length==0
    }
}


export class MonteCarloTreeSearch {
    constructor(state, player = 2, iterations = 1000, exploration_c = Math.sqrt(2)) {
        this.state = state
        this.player = player
        this.iterations = iterations
        this.exploration_c = exploration_c
    }

    getRandomChild(node) {
        let randChoice = Math.floor(Math.random() * node.possibleMoves.length)
        return node.possibleMoves[randChoice]
    }

    selectBestMove() {
        const possibleMoves = this.state.get_possible_moves()
        const root = new Node(null, this.state, possibleMoves)
        console.log('doing iterations ' + this.iterations)
        for (let i = 0; i < this.iterations; i++) {
            let node = this.select_best_child(root) 
            let child = this.expand(node)
            let result = this.playout(child.state.clone())
            this.backpropagate(child, result)
        }
        console.log(root)
        let bestChild = -1;
        let bestRatio = -(10**10);

       
        for (let i = 0; i < root.children.length; i++) {
            let child = root.children[i]
            let currVisits = child.visits
            console.log('col: '+child.col, 'visits: ', currVisits)

            if (currVisits > bestRatio) {
                bestChild = child
                bestRatio = currVisits
            }
        }
        return bestChild.col
    }

    select_best_child(node) {
        while (node.isFullyExpanded()) {
            
            let bestChild = node.children[0]
            let bestUCB = this.get_ucb(bestChild)
            
            for (let i = 1; i < node.children.length; i++) {
                let child = node.children[i]
                let childUCB = this.get_ucb(child)
                if (childUCB > bestUCB) {
                    bestChild = child
                    bestUCB = childUCB
                }
            }
            node = bestChild
        }
        return node
    }
    
    expand(currNode) {

        if (currNode.state.isGameOver) {
            if (currNode.state.winner == this.player) {
                currNode.wins+=1
            }
            return currNode
        }

        let moves = currNode.possibleMoves
        let randChoice = Math.floor(Math.random() * moves.length)
        let move = moves[randChoice]

        let clone = currNode.state.clone()
        clone.insertPiece(move)

        let newChild = new Node(currNode, clone, clone.get_possible_moves(), move)

        currNode.children.push(newChild)
        currNode.possibleMoves.splice(randChoice, 1)
        return newChild
    }

    playout(board) {
        while (!board.isGameOver) {
            let moves = board.get_possible_moves()
            let randChoice = Math.floor(Math.random() * moves.length)
            let move = moves[randChoice]
            board.insertPiece(move)
        }
        if (board.winner == -1){
            return 0
        }
        return (board.winner==this.player) ? 1 : 2
    }

    backpropagate(node, winner) {

        while (node != null) {
            node.visits += 1
            if (node.state.currentPlayer == winner){
                node.wins += 1
            }
            node = node.parent
        }
    }

    get_ucb(node){
        if (node.visits == 0){
            return 10**10
        }
        return node.wins / node.visits + this.exploration_c * Math.sqrt(Math.log(node.parent.visits) / node.visits)
    }

}