export class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}

	static fromArray(values: number[]) {
		let head = null;
		let prev;

		for (let value of values) {
			const node = new ListNode(value, null);

			if (!head) {
				head = node;
			}

			if (prev) {
				prev.next = node;
			}

			prev = node;
		}

		return head;
	}

	static toArray(head: ListNode | null) {
		const array = [];
		let current: ListNode | null = head;

		while (current) {
			array.push(current.val);
			current = current.next;
		}

		return array;
	}
}
