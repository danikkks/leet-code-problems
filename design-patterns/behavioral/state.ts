// create a pull request state representation: draft, ready for review, in review, rejected, approved

abstract class State {
  context?: Context;

  setContext(context: Context): void {
    this.context = context;
  }

  abstract edit(): void;
  abstract putOnReview(): void;
  abstract takeOnReview(): void;
  abstract reject(): void;
  abstract approve(): void;
}

class Context {
  state: State;

  constructor(initialState: State) {
    this.state = initialState;
  }

  setState(state: State) {
    this.state = state;
    this.state.setContext(this);
  }

  edit() {
    this.state.edit();
    return this;
  }

  takeOnReview() {
    this.state.takeOnReview();
    return this;
  }

  reject() {
    this.state.reject();
    return this;
  }

  approve() {
    this.state.approve();
    return this;
  }

  putOnReview() {
    this.state.putOnReview();
    return this;
  }
}

class DraftState extends State {
  edit(): void {}

  takeOnReview(): void {}

  reject(): void {}

  approve(): void {}

  putOnReview(): void {
    this.context?.setState(new ReadyForReviewState());
  }
}

class ReadyForReviewState extends State {
  edit(): void {
    this.context?.setState(new DraftState());
  }

  takeOnReview(): void {
    this.context?.setState(new InReviewState());
  }

  reject(): void {}

  approve(): void {
    this.context?.setState(new ApprovedState());
  }

  putOnReview(): void {}
}

class InReviewState extends State {
  edit(): void {
    this.context?.setState(new DraftState());
  }

  takeOnReview(): void {}

  reject(): void {
    this.context?.setState(new RejectedState());
  }

  approve(): void {
    this.context?.setState(new ApprovedState());
  }

  putOnReview(): void {}
}

class RejectedState extends State {
  edit(): void {
    this.context?.setState(new DraftState());
  }

  takeOnReview(): void {
    this.context?.setState(new InReviewState());
  }

  reject(): void {}

  approve(): void {
    this.context?.setState(new ApprovedState());
  }

  putOnReview(): void {
    this.context?.setState(new InReviewState());
  }
}

class ApprovedState extends State {
  edit(): void {
    this.context?.setState(new DraftState());
  }

  takeOnReview(): void {
    this.context?.setState(new InReviewState());
  }

  reject(): void {}

  approve(): void {}

  putOnReview(): void {
    this.context?.setState(new InReviewState());
  }
}

new Context(new DraftState())
  .putOnReview()
  .takeOnReview()
  .reject()
  .edit()
  .putOnReview()
  .takeOnReview()
  .approve();
