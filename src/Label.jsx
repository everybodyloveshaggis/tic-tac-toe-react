function Label(){
    return (
    <div style={{
        width: '100vw',
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <form>
            <input type='number' name='boardSize'/>
            <label htmlFor="boardSize">  Please enter a board size</label>
        </form>
    </div>
    )
}

export default Label;